import { schema } from 'normalizr';

const genre = new schema.Entity('genre');

export const genres = [ genre ];
export const movie = new schema.Entity('movies', {
    genres: [ genre ]
});
export const movies = [ movie ];