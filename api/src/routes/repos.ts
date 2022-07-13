import { Router, Request, Response } from 'express';

import jsonfile from 'jsonfile';
import axios from 'axios';

export const repos = Router();

const filePath = './data/repos.json';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    //handle getting data from both sources concurrently and return single aggregated response
    const response = await Promise.all([
      jsonfile.readFile(filePath),
      // axios.get('https://api.github.com/users/silverorange/repos'),
    ]);
    const fetchedRepo = response.map((repo) => (repo.data ? repo.data : repo));
    const filteredRepo = fetchedRepo.flat().filter((repo) => !repo.fork);
    res.status(200).json(filteredRepo);
  } catch (error) {
    res.status(500).json({ error });
  }
});
