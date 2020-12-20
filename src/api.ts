import Axios from "axios";

class Api {
  private urlBase: string;
  private token: string = "";

  constructor(baseUrl: string) {
    this.urlBase = baseUrl;
  }

  public signIn() {
    Axios.post("", {}, {});
  }
}

export const API = new Api("https://baseballcloud-front.herokuapp.com/");
