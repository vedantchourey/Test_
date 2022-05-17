class BracketsCrud {
  knexConnection;
  constructor(knexConnection: any) {
    this.knexConnection = knexConnection;
  }
  numberFields = ["id", "tournament_id", "number", "stage_id", "group_id", "round_id", "child_count", "parent_id",]
  formatResult(data: any) {
    for (const key in data) {
      if (typeof data[key] === "object") {
        data[key] = this.formatResult(data[key])
      } else
        if (this.numberFields.includes(key)) {
          data[key] = Number(data[key])
        }
    }
    return data;
  }
  async select(table: string, filter: number | any): Promise<any> {
    // console.log("select", table, filter);
    let data: any;
    try {
      if (typeof filter === "number" || !isNaN(filter)) {
        data = await this.knexConnection("b_" + table)
          .select("*")
          .where({ id: filter });

        return this.formatResult(data[0]);
      } else if (typeof filter === "object") {
        data = await this.knexConnection("b_" + table)
          .select("*")
          .where({ ...filter });
        return this.formatResult(data);
      }
    } catch (ex: any) {
      console.error("select error", ex.message);
    }
  }

  async insert(table: string, data: any | any[]): Promise<any> {
    // console.log("insert", table, data);
    try {
      const d = await this.knexConnection("b_" + table)
        .insert(data)
        .returning("id");
      if (
        table === "stage" ||
        table === "group" ||
        table === "round" ||
        table === "match"
      )
        return d[0];
      return d;
    } catch (ex) {
      console.error("insert", ex);
    }
  }

  async update(table: string, filter: any, data: any): Promise<any> {
    try {
      if (typeof filter === "number" || !isNaN(filter)) {
        await this.knexConnection("b_" + table)
          .update(data)
          .where({
            id: filter,
          });
      } else {
        await this.knexConnection("b_" + table)
          .update(data)
          .where({
            ...filter,
          });
      }
      return true;
    } catch (ex) {
      console.error("update", ex);
    }
    return false;
  }

  delete(table: string, query: any): any {
    console.error("delete", table, query);
    // let repo = this.getRepo(table);
    // return repo?.select(query);
  }
}

export default BracketsCrud;
