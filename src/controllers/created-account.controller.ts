import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {hash} from "bcryptjs";
import {z} from 'zod'
import { ZodValidationPipe } from "../pipes/zod.validation-pipe";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string()
})

type createAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService){}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body:createAccountBodySchema) {
    const {name, email, password} = createAccountBodySchema.parse(body)

    const userWithSaneEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if(userWithSaneEmail) {
      throw new ConflictException('User with same e-mail address already exists')
    }

    const hanshedPassword = await hash(password,8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hanshedPassword
      },
    })
  }
  
}