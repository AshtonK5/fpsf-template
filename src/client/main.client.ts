import { Workspace } from "@rbxts/services";
import { Viewmodel } from "./FPSF/viewmodel/Viewmodel";
import { EquipAnimation } from "./FPSF/viewmodel/ViewmodelAnimations";

const CurrentCamera: Camera | undefined = Workspace.CurrentCamera;

if (CurrentCamera !== undefined)
{
     const vm: Viewmodel = new Viewmodel(CurrentCamera, undefined, Enum.HumanoidRigType.R6);
     const anim = new EquipAnimation();
     vm.ViewmodelAnimator.PlayAnimation(anim);
     vm.Display();
     
}
