import { Viewmodel } from "./Viewmodel";
import { ViewmodelAnimation } from "./ViewmodelAnimation";

export interface IViewmodelAnimator
{
     Viewmodel: Viewmodel;
     ViewmodelOffsetCF: CFrame;
     leftArmOffsetCF: CFrame;
     rightArmOffsetCF: CFrame;
     PlayAnimation(anim: ViewmodelAnimation): void;
}
