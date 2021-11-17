import cors from "cors";
import express from "express";
import formidable from "formidable";
import morgan from "morgan";
import * as http from 'http';
import * as fs from 'fs';


        const app = express();
        app.use(express.json());
        //todas origens
        app.use(cors({
          origin: "*",
        }));
        app.use(express.json());
        //todas origens
        app.use(cors({
          origin: "*",
        }));

        
        app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
          res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
          app.use(cors());
          next();
        });
      

        http.createServer(function (req, res) {
          if (req.url == '/fileupload') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
              var oldpath = files.filetoupload.path;
              var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
              fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
              });
         });
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();
          }
        }).listen(3000);