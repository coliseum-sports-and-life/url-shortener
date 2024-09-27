import { PrismaClient } from '@prisma/client'
import IRedirectRepository from '../../domain/ports/IRedirectRepository'
import Redirect from '../../domain/entities/Redirect'


export default class RedirectDataSource implements IRedirectRepository {

    private prisma: PrismaClient
    
    constructor() {
        this.prisma = new PrismaClient()
    }

    public async Find(code: string): Promise<Redirect | null> {
        return await this.prisma.redirect.findUnique({
            where: {
                code
            }
        })
    }

    public async FindAll(cursor?: string): Promise<Redirect[]> {
        const options: any = {
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        }

        if (cursor) {
            options.skip = 1
            options.cursor = {
                code: cursor
            }
        }

        return await this.prisma.redirect.findMany(options)
    }

    public async Store(redirect: Redirect): Promise<void> {
        await this.prisma.redirect.create({
            data: redirect
        })
    }

    public async Update(redirect: Redirect): Promise<void> {
        await this.prisma.redirect.update({
            where: {
                code: redirect.code
            },
            data: redirect
        })
    }

    public async Delete(code: string): Promise<void> {
        await this.prisma.redirect.delete({
            where: {
                code
            }
        })
    }

}