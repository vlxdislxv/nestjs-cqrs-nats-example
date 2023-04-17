export class AddVertexCommand {
  public constructor(
    public readonly graphId: string,
    public readonly value: string,
  ) {}
}
