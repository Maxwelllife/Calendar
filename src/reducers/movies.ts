import {ActionWithPayload, createReducer} from "../redux/utils";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
}
interface MovieState {
    top: Movie[];
    // 4. тут оголошуємо властивість loading
    loading: boolean;
}


const inintialState:MovieState = {
    top: [],
    // 5. додаємо нову змінну loading (тобто ми не завантажуємо дані початково)
    loading: false,
}

export const moviesLoaded = (movies: Movie[]) => ({
        type:"movies/loaded",
        payload:movies
    }
)

// 2. створимо акшн крієйтор
export const moviesLoading = () => ({
    type: "movies/loading",
})

const moviesReducer = createReducer<MovieState>(
    inintialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
            return {
                ...state,
                top: action.payload,
                // 6. коли дані завантажились то треба ресетнути у false наш індикатор
                loading: false,
            }
        },
        //    3. додаємо new хендлер на цей екшн
        "movies/loading": (state, action) => {
            return {
                ...state,
                loading: true,
            }
        }
    }
)

// const moviesReducer: Reducer<MovieState, ActionWithPayload<Movie[]>> = (state, action) => {
//     const currentState = state ?? inintialState
//
//     switch (action.type) {
//         case "movies/Loaded":
//             return {
//                 ...currentState,
//                 top: action.payload
//             }
//             default:
//                 return currentState;
//     }
// }

export default moviesReducer;