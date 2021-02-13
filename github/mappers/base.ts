export default abstract class MapperBase<Source, Target> {
  public abstract map(source: Source): Target;
}
