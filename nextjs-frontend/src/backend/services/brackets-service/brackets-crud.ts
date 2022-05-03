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

        return table == "stage"
          ? { ...data[0], tournament_id: Number(data[0].tournament_id) }
          : data[0];
      } else if (typeof filter === "object") {
        data = await this.knexConnection("b_" + table)
          .select("*")
          .where({ ...filter });
        return data;
      }
    } catch (ex) {
      //   console.log("select error", ex.message);
    }
  }

  async insert(table: string, data: any | any[]) {
    console.log("insert", table, data);
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
      console.log("insert", ex);
    }
  }

  async update(table: string, filter: any, data: any) {
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
      console.log("update", ex);
    }
    return false;
  }

  delete(table: string, query: any) {
    console.log("delete", table);
    // let repo = this.getRepo(table);
    // return repo?.select(query);
  }
}

export default BracketsCrud;
