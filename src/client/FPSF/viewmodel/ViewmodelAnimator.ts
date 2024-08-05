import { IViewmodelAnimator } from "./IViewmodelAnimator";
import { Viewmodel } from "./Viewmodel";
import { ViewmodelAnimation } from "./ViewmodelAnimation";

export class ViewmodelAnimator implements IViewmodelAnimator
{
     public Viewmodel: Viewmodel;
     
     public ViewmodelOffsetCF: CFrame;
     public leftArmOffsetCF: CFrame;
     public rightArmOffsetCF: CFrame;
     
     public constructor(vm: Viewmodel)
     {
          this.Viewmodel = vm;
          this.ViewmodelOffsetCF = new CFrame(0, -.65, -.78).mul(CFrame.Angles(math.rad(90), 0, 0));
          this.leftArmOffsetCF = new CFrame(.8, 0, 0);
          this.rightArmOffsetCF = new CFrame(-.8, 0, 0);
          
     }
     
     public PlayAnimation(anim: ViewmodelAnimation): void
     {
          anim.Play(this);
     }
}
