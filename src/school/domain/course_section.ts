export type SectionProps = {
  title: string;
  content: string;
};

export class Section {
  public title: string;
  public content: string;

  constructor(props: SectionProps) {
    this.title = props.title;
    this.content = props.content;
  }
}
