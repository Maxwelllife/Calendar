import {Movie, moviesLoaded, moviesLoading} from "../../reducers/movies";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../../store";
import {MovieCard} from "./MovieCard";
import {useEffect} from "react";
import {client} from "../../api/tmdb";
import styles from "./Movies.module.scss";

// 10. та розширюємо інтерфейс - додаємо аналогічний індикатор loading: boolean
interface MoviesProps {
    movies: Movie[],
    loading: boolean,
}

// 9. Дана компонента ще не має такої влатсивості як loading тому додаємо
function Movies({movies, loading}: MoviesProps) {

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {

            // 1. індикатор що дані завантажуються
            // 7. Додали імпорт
            dispatch(moviesLoading());

            const config = await client.getConfiguration();
            const imagesUrl = config.images.base_url;
            const results = await client.getNowPlaying();
            console.log('results', results)
            const mappedResults: Movie[] = results.map((m) => ({
                id: m.id,
                title: m.title,
                overview: m.overview,
                popularity: m.popularity,
                image: m.backdrop_path ? `${imagesUrl}w780${m.backdrop_path}` : '/No_Image_Available.jpg'
            }))
            console.log('mappedResults', mappedResults)
            dispatch(moviesLoaded(mappedResults));
        }

        loadData();
    }, [dispatch])

    return (
        <section>
            <div className={styles.list}>
                {loading ? (<h3>Loading...</h3>) :

                    movies.map((m) => (
                        <MovieCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            overview={m.overview}
                            popularity={m.popularity}
                            image={m.image}
                        />
                    ))
                }
            </div>
        </section>
    )
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    // 8. щоб використати індикатор loading додаємо нову валастивість loading беремо її зі стейту - тобто це та властивість яку ми щойно доадли в нашому ред'юсері
    loading: state.movies.loading,
})

const connector = connect(mapStateToProps);
export default connector(Movies)