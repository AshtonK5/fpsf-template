import { RunService, Players } from "@rbxts/services";
import { IViewmodel } from "./IViewmodel";
import { IDisposable } from "../../../shared/util/IDisposable";
import { ViewmodelAnimator } from "./ViewmodelAnimator";

let RBXScriptConnectionRender: RBXScriptConnection | undefined;
const LocalPlayer: Player = Players.LocalPlayer;
const Character: LuaTuple<[chr: Model]> = LocalPlayer.CharacterAdded.Wait();


export class Viewmodel implements IViewmodel, IDisposable
{
     public ViewmodelAnimator: ViewmodelAnimator;
     protected m_CurrentCamera: Camera;
     public RootModel: Model;
     public RootPart: BasePart;

     public leftArmPart: BasePart;
     public rightArmPart: BasePart;
     
     public leftArmJoint: Motor6D;
     public rightArmJoint: Motor6D;
     public handleJoint: Motor6D;
     
     public bodyColors: BodyColors;
     public humanoid: Humanoid;
     
     private m_bShouldDispose: boolean = false;
     
     
     public constructor(camera: Camera, arms: Model | undefined, rig: Enum.HumanoidRigType)
     {
          // Setup root
          this.m_CurrentCamera = camera;
          this.RootModel = new Instance("Model");
          this.RootModel.Name = `vm_${(arms? arms.Name : "Default")}`;
          
          // Create rootpart
          this.RootPart = this.CreateRootPart();
          this.RootModel.PrimaryPart = this.RootPart;
          
          // Create humanoid
          this.humanoid = new Instance("Humanoid", this.RootModel);
          this.humanoid.RigType = rig;         
          
          // Create arms
          [this.leftArmPart, this.rightArmPart] = this.CreateArmsModel(arms);
          
          // Create animator
          this.ViewmodelAnimator = new ViewmodelAnimator(this);
          
          // Create and Setup joints
          this.leftArmJoint = this.CreateJoint(this.leftArmPart);
          this.rightArmJoint = this.CreateJoint(this.rightArmPart);
          this.handleJoint = new Instance("Motor6D");
          
          this.leftArmJoint.C1 = this.ViewmodelAnimator.leftArmOffsetCF;
          this.rightArmJoint.C1 = this.ViewmodelAnimator.rightArmOffsetCF;
          
          // Create bodycolors
          this.bodyColors = (<BodyColors>Character[0].WaitForChild("Body Colors")).Clone();
          this.bodyColors.Parent = this.RootModel;
          
     }
     
     private CreateRootPart(): BasePart
     {
          let rootPart: BasePart = new Instance("Part", this.RootModel);
          rootPart.Name = "rootPart";
          rootPart.Transparency = 1;
          rootPart.Size = Vector3.zero;
          rootPart.CanCollide = false;
          rootPart.CastShadow = false;
          
          // Set initial position
          rootPart.Position = this.m_CurrentCamera.CFrame.Position;
          return rootPart;
     }
     
     private CreateDefaultArm(): BasePart
     {
          let _currentArm = new Instance("Part", this.RootModel);
          _currentArm.CastShadow = false;
          _currentArm.CanCollide = false;
          _currentArm.Material = Enum.Material.SmoothPlastic;
          _currentArm.Size = new Vector3(.5, 2.35, .5);
          
          return _currentArm;
     }
     
     private CreateDefaultArms(): [BasePart, BasePart]
     {
          let _leftArmPrt: BasePart = this.CreateDefaultArm();
          let _rightArmPrt: BasePart = this.CreateDefaultArm();
          _leftArmPrt.Name = "Left Arm";
          _rightArmPrt.Name = "Right Arm";
          
          return [_leftArmPrt, _rightArmPrt];
     }
     
     private CreateArmsModel(arms: Model | undefined): [BasePart, BasePart]
     {
          if (arms !== undefined)
          {
               
          }
          
          return this.CreateDefaultArms();
     }
     
     protected Render(): void
     {
          if (this.RootModel.PrimaryPart !== undefined)
          {
               // Set primary part cframe
               this.RootModel.PrimaryPart.CFrame = this.m_CurrentCamera.CFrame.mul(this.ViewmodelAnimator.ViewmodelOffsetCF);
               
          }
     }
     
     protected CreateJoint(p: BasePart): Motor6D
     {
          let _joint: Motor6D = new Instance("Motor6D", this.RootPart);
          _joint.Name = p.Name;
          _joint.Part0 = this.RootPart;
          _joint.Part1 = p;
          return _joint;
     }
     
     public Display(): void
     {
          this.RootModel.Parent = this.m_CurrentCamera;
          RBXScriptConnectionRender = RunService.PreRender.Connect(() => this.Render());
          
     }
     
     public StopDisplaying(): void
     {
          RBXScriptConnectionRender?.Disconnect();
          this.RootModel.Parent = undefined;
     }
     
     public Dispose(): void
     {
          if (this.m_bShouldDispose === true) return;
          this.StopDisplaying();
          this.RootModel.Destroy();
          this.m_bShouldDispose = true;
     }
}
