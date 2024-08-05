import { ViewmodelAnimation } from "./ViewmodelAnimation";
import { ViewmodelAnimator } from "./ViewmodelAnimator";
import { TweenService } from "@rbxts/services";

export class EquipAnimation extends ViewmodelAnimation
{
     public override Play(animator: ViewmodelAnimator): void
     {
          
          // Left Arm Animation
          animator.Viewmodel.leftArmJoint.C1 = new CFrame(1, 2, -1).mul(CFrame.Angles(math.rad(30), 0, 0));
          const leftArmTween = TweenService.Create(
               animator.Viewmodel.leftArmJoint,
               new TweenInfo(
                    .65,
                    Enum.EasingStyle.Back,
                    Enum.EasingDirection.InOut,
                    0,
                    false,
                    .2
               ),
               {
                    C1: new CFrame(1, -.1, -.35).mul(CFrame.Angles(math.rad(-20), math.rad(5), math.rad(-17)))
               }
          );
          
          // Right Arm Animation
          animator.Viewmodel.rightArmJoint.C1 = new CFrame(-.9, 2, -1).mul(CFrame.Angles(math.rad(30), 0, 0));
          const rightArmTween = TweenService.Create(
               animator.Viewmodel.rightArmJoint,
               new TweenInfo(
                    .65,
                    Enum.EasingStyle.Back,
                    Enum.EasingDirection.InOut,
                    0,
                    false,
                    .2
               ),
               {
                    C1: new CFrame(-0.9, -0.3, -.25)
               }
          );
          
          leftArmTween.Play();
          rightArmTween.Play();
     }
}
