class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      for (let offspring of this.offspring) {
        let vampire = offspring.vampireWithName(name);
        if (vampire) {
          return vampire;
        }
      }
    }

    return null;
    

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const offspring of this.offspring) {
      totalDescendents += 1;
      totalDescendents += offspring.totalDescendents;
    }

    return totalDescendents;

  }

/*  5!
   A (2)
  |  \ 2
  B    C (2)
  |   / \
  D   E  F
*/



  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    console.log(this.yearConverted);
    let millenialvampires = [];

    if (this.yearConverted > 1980) {
      millenialvampires.push(this);
    }
    for (const offspring of this.offspring) {
      // console.log(offspring.yearConverted);
      let kidsMillennials = offspring.allMillennialVampires;
      millenialvampires = millenialvampires.concat(kidsMillennials);
    }


    
    return millenialvampires;
  }



  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;



