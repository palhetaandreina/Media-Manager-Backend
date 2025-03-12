import { AuthGuard } from '@/auth/auth.guard';
import { MediaService } from '@/media/media.service';
import { UserService } from '@/user/user.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly service: AnalyticsService,
    private readonly mediaService: MediaService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('pdf')
  async printPDF(@Req() req) {
    const userId = req.user.sub;

    const url = `http://localhost:8000/analytics/pdf/template/${userId}`;

    const data = await this.service.printPDF(url);

    return new StreamableFile(Buffer.from(data), {
      type: 'attachment; filename=report.pdf',
      disposition: 'application/octet-stream',
    });
  }

  @Get('pdf/template/:userId/')
  @Render('pdf')
  async renderPDF(@Param('userId') userId: string, @Req() req) {
    // Buscando informacoes de historico de user
    const user: any = await this.userService.getUserById(Number(userId));

    const stats: any[] = await this.mediaService.getMedias(Number(userId));

    const statsPerType = stats.reduce((acc, media) => {
      const type = media.type === 'Filme' ? 'filmes' : 'series';

      if (!acc[type]) {
        acc[type] = { count: 0, watchTime: 0, history: [] };
      }

      acc[type].count += 1;
      acc[type].watchTime += Number((media.duration / 60).toFixed(2));
      acc[type].history.push(media);

      return acc;
    }, {});

    const mostWatchedCategories: Record<string, number> = stats.reduce(
      (acc: Record<string, number>, media) => {
        if (!acc[media.category.name]) {
          acc[media.category.name] = 0;
        }

        acc[media.category.name] += 1;

        return acc;
      },
      {},
    );

    // Ordenando as categorias por quantidade
    const sortedCategories = Object.entries(mostWatchedCategories)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);

    return {
      date: new Date().toLocaleString('pt-Br'),
      data: stats,
      json: JSON.stringify(stats),
      consumedTotal: stats.length,
      categories: sortedCategories,
      userInfo: user,
      statsPerType,
    };
  }
}
