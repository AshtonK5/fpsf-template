
export interface IViewmodel
{
     RootModel: Model;
     RootPart: BasePart;
     leftArmPart: BasePart;
     rightArmPart: BasePart;
     leftArmJoint: Motor6D;
     rightArmJoint: Motor6D;
     handleJoint: Motor6D;
     bodyColors: BodyColors;
     humanoid: Humanoid;
     Display(): void;
     StopDisplaying(): void;
}
