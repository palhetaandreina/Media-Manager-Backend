import { History } from '@entities/history.entity';
import { Media } from '@entities/media.entity';
import { User } from '@entities/user.entity';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateHistoryDTO {
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @Type(() => Number)
  @IsNumber()
  mediaId: number;

  public toEntity() {
    const history = new History();

    history.user = new User();
    history.user.id = this.userId;

    history.media = new Media();
    history.media.id = this.mediaId;

    return history;
  }
}
