import { DateService } from "./../../../services/DateService";
import { computedFrom, autoinject } from "aurelia-framework";
import { bindable } from "aurelia-typed-observable-plugin";
import { Seed } from "entities/Seed";
import "./timeLeft.scss";
import tippy from "tippy.js";

@autoinject
export class TimeLeft {

  @bindable seed: Seed;
  @bindable.booleanAttr hideIcons: boolean;
  @bindable.booleanAttr largest: boolean;
  @bindable.booleanAttr contained: boolean;

  timeLeft: HTMLElement;
  tippyInstance: any;

  constructor(
    private dateService: DateService,
  ) {}

  @computedFrom("seed.startsInMilliseconds", "seed.hasNotStarted")
  get proximity(): number {
    const soon = 86400000;
    const comingUp = soon * 5;
    if (this.seed?.hasNotStarted) {
      if (!this.tippyInstance) {
        this.tippyInstance = tippy(this.timeLeft,
          {
            content: this.dateService.toString(this.seed.startTime, "ddd MMM do - kk:mm z"),
          });
      }
      if (this.seed.startsInMilliseconds > comingUp) {
        return 3; // faroff
      } else if (this.seed.startsInMilliseconds <= soon) {
        return 1; // soon
      } else {
        return 2; // comingUp
      }
    }
  }
}
