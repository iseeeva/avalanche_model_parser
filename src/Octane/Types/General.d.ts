export namespace Model {
  interface Database {
    Filename: {
      Parent: { Model: { ID: { Element: number[][] } } }
    }
  }
}

export namespace Octane {
  namespace Version {
    type OCT2 = "OCT2"
    type OCT3 = "OCT3"
    type All = OCT2 | OCT3
  }

  namespace Platform {
    type PC = "PC"
    type PS3 = "PS3"
    type PS4 = "PS4"
    type XBOX = "XBOX"
    type All = PC | PS3 | PS4 | XBOX
  }

  namespace OCT2 {
    type Version = Version.OCT2
    type Platform = Platform.PC | Platform.PS3 | Platform.XBOX
    namespace Parser {
      interface Variable {
        ID: number;
        Type: string;
        Name: string;
        References: {
          Parent: number[]
          Vertex: number[]
          Index: number
        }
      }
    }
  }

  namespace OCT3 {
    type Version = Version.OCT3
    type Platform = Platform.PS3 | Platform.PS4
    namespace Parser {
      interface Variable {
        ID: number;
        Type: string;
        Name: string;
        Scale: {
          X: number
          Y: number
          Z: number
        }
        References: {
          Parent: number[]
        }
      }
    }
  }
}
