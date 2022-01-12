import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserController } from '../controllers/user.controller';
import { ConcertController } from '../controllers/concert.controller';
import { GroupeController } from '../controllers/groupe.controller';

import { Concert, ConcertSchema } from '../schemas/concert.schema';
import { Groupe, GroupeSchema } from '../schemas/groupe.schema';

import { ConcertService } from '../services/concert.service';
import { GroupeService } from '../services/groupe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		MongooseModule.forFeature([{name: Concert.name, schema: ConcertSchema}]),
		MongooseModule.forFeature([{name: Groupe.name, schema: GroupeSchema}])
  ],
	providers: [UserService, ConcertService, GroupeService],
  controllers: [UserController, ConcertController, GroupeController],
  exports: [UserService, ConcertService, GroupeService],

})
export class UserModule {}
