import { Knex } from "knex";
import { createKnexConnection } from "../database/knex";

class BracketsCrud {
  knexConnection;
  constructor(knexConnection: any) {
    this.knexConnection = knexConnection;
  }
  async select(table: string, filter: number | any) {
    console.log("select", table, filter);

    let data: any;
    try {
      if (typeof filter === "number" || !isNaN(filter)) {
        data = await this.knexConnection("b_" + table)
          .select("*")
          .where({ id: filter });
      } else if (typeof filter === "object") {
        data = await this.knexConnection("b_" + table)
          .select("*")
          .where({ ...filter });
      }
      return data;
    } catch (ex) {
      //   console.log("select error", ex.message);
    }
  }

  async insert(table: string, data: any | any[], query: any) {
    console.log("insert", table, data);
    try {
      let d = await this.knexConnection("b_" + table)
        .insert(data)
        .returning("id");
      if (table === "stage" || table === "group" || table === "round")
        return d[0];
      return d;
    } catch (ex) {
      console.log("insert", ex);
    }
  }

  update(table: string, query: any) {
    console.log("update", table);
    // let repo = this.getRepo(table);
    // return repo?.select(query);
  }

  delete(table: string, query: any) {
    console.log("delete", table);
    // let repo = this.getRepo(table);
    // return repo?.select(query);
  }
}

export default BracketsCrud;
