export class AddEdgeCommand {
  public constructor(
    public readonly graphId: string,
    public readonly source: string,
    public readonly destination: string,
  ) {}
}
