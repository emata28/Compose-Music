import {ELASTIC_IP, ELASTIC_PORT} from './library/consts';
import {ApiResponse, Client, RequestParams} from "@elastic/elasticsearch";
import {Index} from "@elastic/elasticsearch/api/requestParams";

//const { Client, RequestParams } = require('@elastic/elasticsearch');

const URL = `http://${ELASTIC_IP}:${ELASTIC_PORT}`;

export class elastic_connection {
  private Indices: number[][] = [[],[]];
  private client: Client;

  constructor() {
    this.client = new Client({node: URL});
  }

  private readData(response: any) {
    const hits = response.body.hits.hits;
    let channel = 0;
    if (this.Indices[0].length !== 0) {
      channel = 1;
    }
    hits.forEach((song: any) =>
      this.Indices[channel].push(song._source)
    );
  }

  public getData(pIndex: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const client = new Client({node: URL});
      const params: RequestParams.Search = {
        index: pIndex,
        body: {
          from : 0,
          size : 5,
          sort: [
            {
              score : {
                order : "desc"
              }
            }
          ]
        }
      };
      client.search(params, (err, res) => {
        if (!err) {
          this.readData(res);
          resolve(res);
          //console.log("caca2")

        } else {
          reject(err);
        }
        client.close();
      });
    });
  }

  public getInfo(pChannel: number): number[] {
    return this.Indices[pChannel];
  }

  public sendData(info: any) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const client = new Client({node: URL});
      this.Indices = [[],[]];
      //console.log("sendData");
      client.bulk({
        index: "_all",
        body: info
      }, (error, result) => {
        client.close();
        if (!error) {
          //console.log("caca")
          resolve(result);
        } else {
          reject(error);
        }
      });
    });

    // client.close();
    // return result;
  }

  public async deleteData(pIndex: string) {
    const client = new Client({node: URL})
    this.Indices = [[],[]];
    console.log("deleteData");
    /*return this.client.indices.delete({
      index: pIndex
    })*/

    const a =  client.delete_by_query({
      index: "_all",
      body: {
        query : {
          match_all: {}
        }
      }
    },(err: any, resp) => {
      if (err) {
        console.log(err.meta.body.failures);
      }
    });
    client.close();
    return a;
  }
  public async createIndex(pIndex: string) {
    return this.client.indices.create({
      index: pIndex
    });
  }
}
