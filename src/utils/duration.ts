export class Duration {
  #durationSeconds: number;

  constructor(val: string | number) {
    if (typeof val === "number") {
      this.#durationSeconds = val;
    } else {
      if (!this.#testDuration(val)) throw "Invalid string format";
      const hours = Number(val.slice(2, 4));
      const minutes = Number(val.slice(5, 7));
      this.#durationSeconds = hours * 3600 + minutes * 60;
    }
  }

  #testDuration(s: string) {
    return new RegExp("[A-z][A-z][0-9][0-9]H[0-9][0-9]+M").test(s);
  }

  toSeconds(): number {
    return this.#durationSeconds;
  }

  toHoursMinutes(): number[] {
    const hours = Math.floor(this.toSeconds() / 3600);
    const minutes = Math.floor((this.toSeconds() % 3600) / 60);
    return [hours, minutes];
  }

  toString(): string {
    const [hours, minutes] = this.toHoursMinutes();
    return `${hours} hr ${minutes} min`;
  }
}
