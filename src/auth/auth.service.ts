import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { Model } from "mongoose";
import { BaseValidator } from "src/core/validator/BaseValidator";
import { SignupValidator } from "./validator/signup.validator";
import * as bcrypt from 'bcrypt';
import { LoginValidator } from "./validator/login.validator";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private validator: BaseValidator,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async signup(inputs: Record<string, any>) {
        const { username, email, password } = await this.validator.validateObject(inputs, SignupValidator);
        const isExist = await this.userModel.findOne({ $or: [{ username }, { email }] })
        if (isExist) {
            throw new ConflictException('Username or email already exists');
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ username, email, password: hash })
        const userObj = {
            userId: user._id,
            username: user.username,
            email: user.email
        }
        userObj['token'] = await this.jwtService.signAsync(userObj);
        return {
            user: userObj
        }
    }

    async login(inputs: Record<string, any>) {
        const { username, password } = await this.validator.validateObject(inputs, LoginValidator);
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid Password');
        }
        const userObj = {
            userId: user._id,
            username: user.username,
            email: user.email
        }
        userObj['token'] = await this.jwtService.signAsync(userObj);
        return {
            user: userObj
        }
    }
}