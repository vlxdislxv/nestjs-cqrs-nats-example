export class DeleteVertexCommand {
  public constructor(
    public readonly graphId: string,
    public readonly value: string,
  ) {}
}
