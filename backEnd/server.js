import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("popo")
})

mongoose.connect("mongodb://root:password@localhost:27017/issues?authSource=admin");

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if(err)
            console.log(err);
        else 
            res.send(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issues) => {
        if(err)
            console.log(err);
        else 
            res.send(issues);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
    .then(issue => {
        res.status(200).json({'issue': "added successfully"});
    }).catch(err => {
        res.status(400).send('failed to create new issue');
    });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(!issue)
            return next(new Error('could not load document'));
        else {

        issue.title = req.body.title;
        issue.responsible = req.body.responsible;
        issue.description = req.body.description;
        issue.severity = req.body.seevrity;
        issue.status = req.body.status;

        issue.save()
        .then(issue => {
            res.json('Update Done');
        }).catch(err => {
            res.status(400).send('Update failed');
        });

        }

    });
});

router.route('/issues/delete/:id').delete((req, res) => {
   Issue.findByIdAndRemove({_id: req.params.id}, (err, issues) => {
    if(err)
            console.log(err);
        else 
            res.send(issues);
   }) 
});

app.use('/', router);

app.listen(4000, () => {
    console.log("server running on port 4000");
});