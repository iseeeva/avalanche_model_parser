export interface XML {
    root_node: RootNode;
}

export interface RootNode {
    SubNetworkPool: SubNetworkPool;
    CollisionShapePool: CollisionShapePool;
    PhysicsBodyPool: PhysicsBodyPool;
    DisplayLayerPool: DisplayLayerPool;
    MaterialBundlePool: MaterialBundlePool;
    MaterialPool: MaterialPool;
    VertexBufferPool: VertexBufferPool;
    IndexBufferPool: IndexBufferPool;
    SceneComponentPool: SceneComponentPool;
    SceneTreeNodePool: SceneTreeNodePool;
    AssetPool: AssetPool;
    AssociationPool: AssociationPool;
    ExporterDate: ExporterDate;
    ExporterTime: ExporterDate;
}

export interface AssetPool {
    Asset: Asset;
}

export interface Asset {
    Name: ExporterDate;
    SubNetworkRef: ExporterDate;
    SceneTreeNodeRef: ExporterDate;
    AggregateCount: ExporterDate;
    _type: AssetType;
    _text: string;
}

export interface ExporterDate {
    _type: ExporterDateType;
    _text: string;
}

export enum ExporterDateType {
    Float = "float",
    Int24 = "int24",
    Int8 = "int8",
    String = "string",
    Uint16 = "uint16",
    Uint32 = "uint32",
}

export enum AssetType {
    ReferenceString = "reference_string",
}

export interface AssociationPool {
    Association: Association[];
}

export interface Association {
    NodeName: ExporterDate;
    Type: ExporterDate;
    NodeRef?: ExporterDate;
    ComponentRef?: ExporterDate;
    _type: AssetType;
    _text: string;
    SceneTreeNodeRef?: ExporterDate;
    SubNetworkRef?: ExporterDate;
    AltNodeName?: ExporterDate;
    MaterialRef?: ExporterDate;
    PrimitiveRefs?: Points;
    PhysicsBodyRef?: ExporterDate;
    AssetIndex?: ExporterDate;
    KinematicStateNodeName?: ExporterDate;
    CollisionShapeRef?: ExporterDate;
    SceneTreeNodeRefs?: InfluenceRefs;
    InfluenceRefs?: InfluenceRefs;
}

export interface InfluenceRefs {
    entry: string;
    _type: InfluenceRefsType;
}

export enum InfluenceRefsType {
    FloatList = "float_list",
    Int24List = "int24_list",
    Int8List = "int8_list",
    StringList = "string_list",
    Uint16List = "uint16_list",
    Uint16Uint16List = "uint16_uint16_list",
    Uint16Uint16ListAlt = "uint16_uint16_list_alt",
    Uint16Uint8Bin = "uint16_uint8_bin",
    Uint8List = "uint8_list",
}

export interface Points {
    entry: string[];
    _type: InfluenceRefsType;
}

export interface Entry {
    entry: {
        _text: string;
    }[]
}

export interface CollisionShapePool {
    Shape: Shape;
}

export interface Shape {
    ShapeType: ExporterDate;
    SurfaceType: ExporterDate;
    Points: Points;
    CollisionMargin: ExporterDate;
    _type: AssetType;
    _text: string;
}

export interface DisplayLayerPool {
    DisplayLayer: DisplayLayer;
}

export interface DisplayLayer {
    Name: ExporterDate;
    Mask?: ExporterDate;
    _type: AssetType;
    _text: string;
    BindPoseSkinLocalToWorldMatrixInverseData?: Points;
}

export interface IndexBufferPool {
    IndexBuffer: ExBuffer[];
}

export interface ExBuffer {
    Width?: ExporterDate;
    Name: ExporterDate;
    Flags: ExporterDate;
    Size: ExporterDate;
    FileName?: ExporterDate;
    _type: AssetType;
    _text: string;
    HeapLoc?: ExporterDate;
}

export interface MaterialBundlePool {
    MaterialBundle: MaterialBundle;
}

export interface MaterialBundle {
    FileName: ExporterDate;
    _type: AssetType;
    _text: string;
}

export interface MaterialPool {
    Material: Material[];
}

export interface Material {
    Name: ExporterDate;
    FileName: ExporterDate;
    Type: ExporterDate;
    Effect: Effect;
    PropertyEntries: string;
    _type: AssetType;
    _text: string;
}

export interface Effect {
    _type: ExporterDateType;
}

export interface PhysicsBodyPool {
    PhysicsBody: PhysicsBody;
}

export interface PhysicsBody {
    BodyType: ExporterDate;
    Mass: ExporterDate;
    LinearDamping: ExporterDate;
    AngularDamping: ExporterDate;
    Restitution: ExporterDate;
    Friction: ExporterDate;
    Kinematic: ExporterDate;
    DisableDeactivation: ExporterDate;
    CenterOfMass: Points;
    InertiaTensor: Points;
    LocalToWorldMatrix: Points;
    _type: AssetType;
    _text: string;
}

export interface SceneComponentPool {
    SceneComponent: SceneComponent;
}

export interface SceneComponent {
    Type: ExporterDate;
    _type: AssetType;
    _text: string;
}

export interface SceneTreeNodePool {
    Node: Node[];
}

export interface Node {
    Type: ExporterDate;
    _type: AssetType;
    _text: string;
    NodeName?: ExporterDate;
    Uuid?: Points;
    DisplayLayer?: ExporterDate;
    ParentNodeReferences?: InfluenceRefs;
    LocalToParentMatrix?: Points;
    Visible?: ExporterDate;
    DynamicVisPlacement?: ExporterDate;
    MeshName?: Effect;
    BoundingSphereCenter?: Points;
    BoundingSphereRadius?: ExporterDate;
    BoundingOBBOrientation?: Points;
    BoundingOBBCenter?: Points;
    BoundingOBBExtents?: Points;
    BoundingBox?: Points;
    BoundingType?: ExporterDate;
    LOD01Distance?: ExporterDate;
    LOD12Distance?: ExporterDate;
    LOD23Distance?: ExporterDate;
    UnitBase?: Points;
    UnitScale?: Entry;
    NumPrimitives?: ExporterDate;
    Primitives?: Primitives;
    BindPoseMeshLocalToWorldMatrix?: Points;
    NumInfluences?: ExporterDate;
    NumInfluencesPerVertex?: ExporterDate;
    Influences?: Influences;
    NumMaterialComponents?: ExporterDate;
}

export interface Influences {
    Influence: DisplayLayer[];
}

export interface Primitives {
    Primitive: Primitive[];
}

export interface Primitive {
    MaterialName: ExporterDate;
    MaterialReference: ExporterDate;
    vformatCRC: ExporterDate;
    RenderCaps: ExporterDate;
    BillboardType: ExporterDate;
    OcclusionType: ExporterDate;
    OcclusionCheckRadius: ExporterDate;
    OcclusionFadeKp: ExporterDate;
    UnitBase: Points;
    UnitScale: Points;
    Idata: Points;
    Vdata: Points;
    _type: AssetType;
    _text: string;
}

export interface SubNetworkPool {
    SubNetwork: SubNetwork;
}

export interface SubNetwork {
    Type: ExporterDate;
    Name: ExporterDate;
    ConstantHeaderCount: ExporterDate;
    VariableHeaderCount: ExporterDate;
    ConstantDataNodeCount: ExporterDate;
    VariableDataNodeCount: ExporterDate;
    ProcessorNodeCount: ExporterDate;
    ConstantAccumulatedSize32: ConstantAccumulatedSize;
    ConstantAccumulatedSize64: ConstantAccumulatedSize;
    VariableAccumulatedSize32: { [key: string]: Points };
    VariableAccumulatedSize64: { [key: string]: Points };
    BasisCount: ExporterDate;
    BasisConversionCount: ExporterDate;
    ComponentFamilyCount: ExporterDate;
    ComponentMemberCount: ExporterDate;
    VariantGroupCount: ExporterDate;
    VariantMemberCount: ExporterDate;
    ConnectionMapUsedDataNodes: Points;
    DefaultDataSize: ExporterDate;
    LayerBindCount: ExporterDate;
    BaseDataNodeLinksCount: ExporterDate;
    BaseDataNodeLinksAdditionalSize: ExporterDate;
    BasisPool: BasisPool;
    HeaderStrings: Points;
    HeaderStringIndices: Points;
    HeaderLayout: Points;
    ConstantLayoutCount: ExporterDate;
    NetworkBuffer: Points;
    DataNodePool: DataNodePool;
    ComponentNames: Points;
    ComponentFamilyPool: ComponentFamilyPool;
    BasisConversionPool: BasisConversionPool;
    ProcessorNodePool: ProcessorNodePool;
    VariantGroupPool: VariantGroupPool;
    DefaultDataIndices: Points;
    DefaultData: Points;
    BaseDataNodeLinksPool: BaseDataNodeLinksPool;
    _type: AssetType;
    _text: string;
}

export interface BaseDataNodeLinksPool {
    BaseDataNodeLinks: BaseDataNodeLinks;
}

export interface BaseDataNodeLinks {
    Name: ExporterDate;
    ConnectionTemplate: ExporterDate;
    AttachName: Effect;
    Flags: ExporterDate;
    LocalUsedDataNodeIndices: Points;
    LocalToPortIndices: Points;
    PortToLocalIndices: Points;
    _type: AssetType;
    _text: string;
}

export interface BasisConversionPool {
    BasisConversion: BasisConversion[];
}

export interface BasisConversion {
    FromBasisRef: ExporterDate;
    ToBasisRef: ExporterDate;
    DataNodeRef: ExporterDate;
}

export interface BasisPool {
    Basis: Basis[];
}

export interface Basis {
    Type?: ExporterDate;
    Behavior: ExporterDate;
    _type: AssetType;
    _text: string;
    Name?: ExporterDate;
    ParentRef?: ExporterDate;
}

export interface ComponentFamilyPool {
    ComponentFamily: ComponentFamily[];
}

export interface ComponentFamily {
    PatriarchDataNodeRef: ExporterDate;
    ComponentNameIndices: InfluenceRefs;
    ComponentDataNodeRefs: InfluenceRefs;
}

export interface ConstantAccumulatedSize {
    __1: Points;
}

export interface DataNodePool {
    DataNode: DataNode[];
}

export interface DataNode {
    Header: ExporterDate;
    Type: ExporterDate;
    Static?: ExporterDate;
    Data?: Data;
    _type: AssetType;
    _text: string;
    Length?: ExporterDate;
    RelationshipDataBlock?: Points;
    External?: ExporterDate;
    BasisRef?: ExporterDate;
    Peeked?: ExporterDate;
    Count?: ExporterDate;
}

export interface Data {
    _type?: ScaleType;
    _text?: string;
    entry?: string[];
    Translation?: Points;
    Orientation?: Points;
    Scale?: Scale;
    Unscale?: Points;
    Matrix?: Points;
}

export interface Scale {
    _type: ScaleType;
    _text?: string;
    entry?: string[];
}

export enum ScaleType {
    Float = "float",
    FloatList = "float_list",
    Int8 = "int8",
}

export interface ProcessorNodePool {
    ProcessorNode: ProcessorNode[];
}

export interface ProcessorNode {
    Header: ExporterDate;
    Type: ExporterDate;
    DataNodeRefs: Points;
    DataNodeAttributes: Points;
    _type: AssetType;
    _text: string;
    NetworkBufferOffsets?: InfluenceRefs;
    NetworkBufferNames?: InfluenceRefs;
}

export interface VariantGroupPool {
    VariantGroup: Points[];
}

export interface VertexBufferPool {
    VertexBuffer: ExBuffer[];
}
