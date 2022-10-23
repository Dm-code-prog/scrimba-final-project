import axios from 'axios';

const TriviaAPI = axios.create({
    baseURL: 'https://opentdb.com/api.php',
    timeout: 3000,
});

export { TriviaAPI };
