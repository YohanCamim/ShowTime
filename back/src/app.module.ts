import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertController } from './controllers/concert.controller';
import { ConcertGroupController } from './controllers/concertGroup.controller';
import { ConcertGenreController } from './controllers/concertGenre.controller';
import { FavoriteController } from './controllers/favorite.controller';
import { ReservationController } from './controllers/reservation.controller';
import { WishlistController } from './controllers/wishlist.controller';
// import { UserController } from './controllers/user.controller';
import { GroupeController } from './controllers/groupe.controller';
import { GenreController } from './controllers/genre.controller';

// import { User, UserSchema } from './schemas/user.schema';
import { Concert, ConcertSchema } from './schemas/concert.schema';
import { Groupe, GroupeSchema } from './schemas/groupe.schema';
import { Genre, GenreSchema } from './schemas/genre.schema';

import { ConcertService } from './services/concert.service';
// import { UserService } from './services/user.service';
import { GroupeService } from './services/groupe.service';
import { GenreService } from './services/genre.service';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(),
              // MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
            MongooseModule.forRoot('mongodb+srv://admin:admin@dbshowtime.dsdpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
              useNewUrlParser: true,

            }),

            MongooseModule.forFeature([{name: Concert.name, schema: ConcertSchema}]),
            MongooseModule.forFeature([{name: Groupe.name, schema: GroupeSchema}]),
						MongooseModule.forFeature([{name: Genre.name, schema: GenreSchema}]),
						UserModule,
						AuthModule,
          ],
  controllers: [AppController, FavoriteController, ReservationController, WishlistController,
		ConcertController, ConcertGroupController, ConcertGenreController,
		GroupeController, GenreController],
  providers: [AppService, ConcertService, GroupeService, GenreService],
	exports: [GroupeService]
})
export class AppModule {}







