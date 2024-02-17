import { UniqueEntityID } from 'src/commons/UniqueEntityID';
import { Result, right } from 'src/commons/result';

export type SchoolProps = {
  name: string;
  address: string;
};

export class School {
  id: string;
  name: string;
  address: string;

  constructor(props: SchoolProps, id?: string) {
    this.id = id;
    this.name = props.name;
    this.address = props.address;
  }
  public static create(props: SchoolProps, id?: string) {
    id = id ?? UniqueEntityID();
    const school = new School(props, id);
    return right(Result.ok<School>(school));
  }
}
