import { create } from "zustand";

//레이어오픈 전역 스토어 

const useLayerStore = create((set) => ({
   isLayerOpne: false,
//    screenScrollRock: false,

    layerOpen: () => {
    set({isLayerOpne: true})
   },
   
    layerClose: () => {
        set({isLayerOpne: false})
    }

   }
));

export default useLayerStore;