import { Player } from "@domain/entities/Player";
import { Stats } from "@domain/entities/Stats";
import { IPlayerRepository } from "@domain/repositories/IPlayerRepository";
import { round } from "@shared/utils/round";

export class GetStats {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  private computeBestCountry(players: Player[]): Stats["bestCountry"] {
    if (players.length === 0) return null;

    const ratioByCountries = new Map<string, { wins: number; total: number }>();

    for (const player of players) {
      const code = player.country.code;
      const current = ratioByCountries.get(code) ?? { wins: 0, total: 0 };
      ratioByCountries.set(code, {
        wins: current.wins + player.data.last.filter((r) => r === 1).length,
        total: current.total + player.data.last.length,
      });
    }

    let bestCode = "";
    let bestRatio = -1;

    for (const [code, { wins, total }] of ratioByCountries) {
      const ratio = total === 0 ? 0 : wins / total;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestCode = code;
      }
    }

    return { code: bestCode, winRatio: round(bestRatio) };
  }

  private computeAverageBMI(players: Player[]): number | null {
    if (players.length === 0) return null;

    const bmis = players.map(({ data: { weight, height } }) => {
      const weightKg = weight / 1000;
      const heightM = height / 100;
      return weightKg / (heightM * heightM);
    });

    const avg = bmis.reduce((sum, bmi) => sum + bmi, 0) / bmis.length;
    return round(avg);
  }

  private computeMedianHeight(players: Player[]): number | null {
    if (players.length === 0) return null;

    const sorted = [...players].map((p) => p.data.height).sort((a, b) => a - b);

    if (sorted.length === 1) return sorted[0];

    const midIndex = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[midIndex - 1] + sorted[midIndex]) / 2
      : sorted[midIndex];
  }

  async execute(): Promise<Stats> {
    const players = await this.playerRepository.findAll();

    return {
      bestCountry: this.computeBestCountry(players),
      averageBMI: this.computeAverageBMI(players),
      medianHeight: this.computeMedianHeight(players),
    };
  }
}
