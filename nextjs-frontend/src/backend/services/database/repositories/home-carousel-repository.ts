import { Knex } from "knex";
import { BaseRepository } from "./base-repository";
import { IHomeCarousel } from "../models/i-home-carousel";

const keys = ["id", "name", "subtitle", "navigation", "image", "created_at"];

export class HomeCarouselRepository extends BaseRepository<IHomeCarousel> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "home-carousel");
  }

  async createHomeCarousel(homeCarousel: IHomeCarousel): Promise<string> {
    const ids = await this.entities().insert(homeCarousel).returning("id");
    return ids[0] as string;
  }

  async getHomeCarousel(id: string): Promise<IHomeCarousel | any> {
    return await this.entities().select("*").where({id: id}).first();
  }

  async fetch(): Promise<IHomeCarousel[]> {
    return await this.entities().select(...keys);
  }

  async update(homeCarousel: IHomeCarousel): Promise<IHomeCarousel> {
    const updateItems = await this.entities().where("id", homeCarousel.id).update(homeCarousel, keys);
    return updateItems[0];
  }

  async delete(id: string): Promise<IHomeCarousel | undefined> {
    return this.entities().where({id}).delete();
  }
}
