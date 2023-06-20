const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const xlsxReader = require('xlsx')


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/append', (req, res) => {
    const name = req.body.name;
    const splitData = name.split(',');
    let data = splitData.join('\n');
    data += '\n';
    
    if(!data || (data === '\n' || data === ' ')) {
        return;
    }

    fs.appendFile('configuration.txt', data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error appending data.');
        } else {
            const response = `
                <script>
                    window.onload = function() {
                        alert('Data saved successfully.');
                    };
                </script>
            `;
            res.status(200).send(response);
        }
    });
});

app.post('/run', (req, res) => {
    const email = req.body.email;
    const splitData = email.split(','); // ['q', 'w', 'e']

    let data = splitData.join('\n');
    data += '\n';

    if(!data || (data === '\n' || data === ' ')) {
        return;
    }
        
    fs.appendFile('runtime.txt', data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error appending data.');
        } else {
            res.send('Data appended successfully.');
        }
    });
});

app.get('/getConfiguration',(req,res)=>{
    const datas = [];
    fs.readFile('configuration.txt',(err,data)=>{
        if(err) {
            console.error("error in reading config file ",err)
            res.sendStatus(500).send('Error in getting config')
        }
        const strData = data.toString()
        const dataSplit = strData.split('\n')

        for (const d of dataSplit){
            datas.push(d)
        }
        res.status(200).json(datas)
    });
});

app.get('/getRunTime',(req,res)=>{
    const datas = [];
    fs.readFile('runtime.txt',(err,data)=>{
        if(err) {
            console.error("error in reading config file ",err)
            res.sendStatus(500).send('Error in getting config')
        }
        const strData = data.toString()

        const dataSplit = strData.split('\n')

        for (const d of dataSplit){
            datas.push(d)
        }
        res.status(200).json(datas)
    });
});

app.post('/getFilesContent',(req,res)=>{
    const data = [];
    const testCasesToOpen = req.body.data;
    console.log('boldy is ',testCasesToOpen)
    for (const t of testCasesToOpen) {
        const fileName = `${t}.xlsx`
        const file = xlsxReader.readFile(`./${fileName}`)
        const sheets = file.SheetNames
        for (let i=0; i < sheets.length; i++){
            const temp = xlsxReader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach(res => {
                data.push(res)
            })
        }
    }
    return res.json(data);
})

app.post('/getRuntimeFilesContent',(req,res)=>{
    const data = [];
    const testCasesToOpen = req.body.data;
    console.log('boldy is ',testCasesToOpen)
    for (const t of testCasesToOpen) {
        const fileName = `${t}.xlsx`
        const file = xlsxReader.readFile(`./${fileName}`)
        const sheets = file.SheetNames
        for (let i=0; i < sheets.length; i++){
            const temp = xlsxReader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach(res => {
                data.push(res)
            })
        }
    }
    return res.json(data);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
