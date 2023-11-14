import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
const app = express();
const port = 3000;

app.get('/video-info', function (req, res) {
  ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe');

  ffmpeg('video.mp4')
  .setStartTime('00:00:00')
  .setDuration(5)
  .noAudio()
  .on('start', function(commandLine) {
    console.log('Processing started: ' + commandLine);
  })
  .on('progress', function(progress) {
    console.log('Processing: ' + JSON.stringify(progress) + '% done');
  })
  .on('error', function(err) {
    console.log('Error: ' + err.message);
  })
  .on('end', function() {
    console.log('Finished processing');
    res.send('Finished processing');
  }).save('video-processed.mp4');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});