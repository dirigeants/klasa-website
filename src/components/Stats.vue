<template>
  <div id="stats">
    {{ downloads }} <strong> downloads </strong>  {{ stars }} <strong> stars </strong> {{ contributors }} <strong> contributors </strong>
  </div>
</template>

<script>
  import request from 'snekfetch';

  const data = {
    downloads: '1,000+',
    stars: '21+',
    contributors: '20+',
    fetching: false,
  };

  export default {
    name: 'stats',

    data() {
      if (data.fetching) return data;
      data.fetching = true;

      request.get('https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/klasa').end((err, res) => {
        if (err) return;
        data.downloads = 0;
        for (const item of res.body.downloads) data.downloads += item.downloads;
        data.downloads = data.downloads.toLocaleString();
      });
      request.get('https://api.github.com/repos/dirigeants/klasa').end((err, res) => {
        if (!err) data.stars = res.body.stargazers_count.toLocaleString();
      });
      request.get('https://api.github.com/repos/dirigeants/klasa/stats/contributors').end((err, res) => {
        if (!err) data.contributors = res.body.length.toLocaleString();
      });

      return data;
    },
  };
</script>
