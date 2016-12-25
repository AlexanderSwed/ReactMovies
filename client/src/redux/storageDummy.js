export class Data {
  constructor(moviesList = []) {
    this.favs = moviesList;
  }

  addFavs(mov) {
    this.favs = [...this.favs, mov];
    return this.favs;
  }

  removeFav(id) {
    let i = this.favs.findIndex((el) => el.id === id);
    this.favs = i >= 0 ? [...this.favs.slice(0, i), ...this.favs.slice(i + 1)] : this.favs;
    return this.favs;
  }

  findById(id) {
  let el, i = 0;
    for (el of this.favs) {
    	if (el.id === id) {
      	return i;
      }
      i++;
    }
    return null;
  }
}

window.dataStorage = new Data();