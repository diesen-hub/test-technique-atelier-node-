export class PlayerError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {}
}
