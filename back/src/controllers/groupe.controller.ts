import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Groupe } from "../schemas/groupe.schema";
import { GroupeService } from "src/services/groupe.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('groups')
export class GroupeController {
    constructor(private readonly groupeService: GroupeService){}

    @Post() 
    @UseGuards(AuthGuard('jwt'))
    async createGroupe(@Res() response, @Body() groupe: Groupe) {
        const respAdmin = response.req.user.admin;
        if (respAdmin===true) {
            const newGroupe = await this.groupeService.create(groupe);
            return response.status(HttpStatus.CREATED).json({ newGroupe })
        } else {
            return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
        }
    }

    @Get()
    async fetchAll(@Res() response) {
        const groups = await this.groupeService.readAll();
        return response.status(HttpStatus.OK).json({ groups })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const group = await this.groupeService.readById(id);
        return response.status(HttpStatus.OK).json({ group })
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Res() response, @Param('id') id, @Body() groupe: Groupe) {
        const respAdmin = response.req.user.admin;
        if (respAdmin===true) {
            const updatedGroupe = await this.groupeService.update(id, groupe);
            return response.status(HttpStatus.OK).json({ updatedGroupe })
        } else {
            return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
        }

    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Res() response, @Param('id') id) {
        const respAdmin = response.req.user.admin;
        if (respAdmin===true) {
            const deletedGroupe = await this.groupeService.delete(id);
            return response.status(HttpStatus.OK).json({ deletedGroupe })
        } else {
            return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
        }
        
    }
}

