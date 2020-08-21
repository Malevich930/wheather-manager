import React from 'react'
import { connect } from 'react-redux'
import { allTask, deleteTask, addTask, getFavorite, deleteFavorite } from '../redux/actions'
import '../components/Main.css'


class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('login')) {
            let listCities = localStorage.getItem('login')
            let list = JSON.parse(listCities)
            list.map(item => {
                return (this.getWeather(item))
            })
            list.map(item => {
                return (this.props.getFavorite(item))
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.favoriteCities !== prevProps.favoriteCities) {
            localStorage.setItem('login', JSON.stringify(this.props.favoriteCities));
        }
    }

    async getWeather(name) {
        if (this.props.weatherInfo.some(item => item.cityName.toLowerCase() === name.toLowerCase())) {
            this.setState({
                warn: true
            })
        } else {
            const city = name
            const key = '34dce0717656414586f7ca31ed60f4e1'
            let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}&lang=[ru,en]`
            let response = await fetch(url, {
                method: "GET"
            })
            let result = await response.json();
            let cityName = result.city_name
            let tempOneDay = result.data[0].temp
            let tempThreeDay = (result.data.slice(0, 3).map(item => {
                return item.temp
            }).reduce(function (sum, current) {
                return sum + current;
            }, 0) / 3).toFixed(1);
            let tempSevenDay = (result.data.slice(0, 8).map(item => {
                return item.temp
            }).reduce(function (sum, current) {
                return sum + current;
            }, 0) / 7).toFixed(1);
            let tempFourteenDay = (result.data.slice(0, 15).map(item => {
                return item.temp
            }).reduce(function (sum, current) {
                return sum + current;
            }, 0) / 14).toFixed(1);
            let allInfo = { cityName: cityName, tempOneDay: tempOneDay, tempThreeDay: tempThreeDay, tempSevenDay: tempSevenDay, tempFourteenDay: tempFourteenDay }
            this.props.allTask(allInfo)
            this.setState({
                name: '',
                warn: false
            })
        }
    }

    addFavorite(name) {
        if (!this.props.favoriteCities.includes(name)) {
            this.props.getFavorite(name)
        }
    }

    delete(name) {
        const newArr = this.props.weatherInfo.filter((item) => item.cityName !== name)
        const favorite = this.props.favoriteCities.filter((item) => item !== name)
        this.props.deleteTask(newArr)
        this.props.deleteFavorite(favorite)
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    filterCity = (event) => {
        if (event.target.value === 'По А-Я') {
            let arr = this.props.weatherInfo.sort((a, b) => a.cityName > b.cityName ? 1 : -1);
            this.props.addTask(arr)
        }
        if (event.target.value === 'По Я-А') {
            let arr = this.props.weatherInfo.sort((a, b) => a.cityName < b.cityName ? 1 : -1);
            this.props.addTask(arr)
        }
    }

    filterDay = (event) => {
        if (event.target.value === 'По возрастанию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempOneDay > b.tempOneDay ? 1 : -1);
            this.props.addTask(arr)
        }
        if (event.target.value === 'По убыванию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempOneDay < b.tempOneDay ? 1 : -1);
            this.props.addTask(arr)
        }
    }

    filterThreeDay = (event) => {
        if (event.target.value === 'По возрастанию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempThreeDay > b.tempThreeDay ? 1 : -1);
            this.props.addTask(arr)
        }
        if (event.target.value === 'По убыванию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempThreeDay < b.tempThreeDay ? 1 : -1);
            this.props.addTask(arr)
        }
    }

    filterSevenDay = (event) => {
        if (event.target.value === 'По возрастанию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempSevenDay > b.tempSevenDay ? 1 : -1);
            this.props.addTask(arr)
        }
        if (event.target.value === 'По убыванию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempSevenDay < b.tempSevenDay ? 1 : -1);
            this.props.addTask(arr)
        }
    }

    filterFourteenDay = (event) => {
        if (event.target.value === 'По возрастанию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempFourteenDay > b.tempFourteenDay ? 1 : -1);
            this.props.addTask(arr)
        }
        if (event.target.value === 'По убыванию') {
            let arr = this.props.weatherInfo.sort((a, b) => a.tempFourteenDay < b.tempFourteenDay ? 1 : -1);
            this.props.addTask(arr)
        }
    }


    render() {
        let sortCity = <>
            <select value={this.state.value} onChange={this.filterCity}>
                <option value="По А-Я">По А-Я</option>
                <option value="По Я-А">По Я-А</option>
            </select>
        </>
        let sortDay = <>
            <select value={this.state.value} onChange={this.filterDay}>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
            </select>
        </>
        let sortThreeDay = <>
            <select value={this.state.value} onChange={this.filterThreeDay}>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
            </select>
        </>
        let sortSevenDay = <>
            <select value={this.state.value} onChange={this.filterThreeDay}>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
            </select>
        </>
        let sortFourteenDay = <>
            <select value={this.state.value} onChange={this.filterFourteenDay}>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
            </select>
        </>

        return (
            <>
                <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                <button onClick={() => this.getWeather(this.state.name)}>Добавить</button>
                <label for="title" class="form-warn">{this.state.warn ? 'Такой город уже есть в списке.' : null}</label>
                <div className="table">
                    <div class="table-row">
                        <div class="table-cell title"><p>Название города</p> {sortCity} </div>
                        <div class="table-cell title"><p>Температура сегодня</p>{sortDay} </div>
                        <div class="table-cell title"><p>Ср за 3 дня</p> {sortThreeDay} </div>
                        <div class="table-cell title"><p>Ср за 7 дней</p> {sortSevenDay} </div>
                        <div class="table-cell title"><p>Ср за 14 дней</p>  {sortFourteenDay}</div>
                        <div class="table-cell action">
                            <ul class="list inline">
                                <li class="list-item">
                                    Избранное
                                </li>
                                <li >Удалить
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="table">
                    {this.props.weatherInfo ? this.props.weatherInfo.map(item => {
                        return (
                            <>
                                <div class="table-row">
                                    <div class="table-cell title">{item.cityName}</div>
                                    <div class="table-cell title">{item.tempOneDay}</div>
                                    <div class="table-cell title">{item.tempThreeDay}</div>
                                    <div class="table-cell title">{item.tempSevenDay}</div>
                                    <div class="table-cell title">{item.tempFourteenDay}</div>
                                    <div class="table-cell action">
                                        <ul class="list inline">
                                            <li class="list-item">
                                                <button class="edit" onClick={() => this.addFavorite(item.cityName)}>Избранное</button>
                                            </li>
                                            <li class="list-item">
                                                <button class="delete" onClick={() => this.delete(item.cityName)}>Удалить</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    }) : null}
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        weatherInfo: state.weatherInfo,
        favoriteCities: state.favoriteCities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        allTask: (payload) => dispatch(allTask(payload)),
        deleteTask: (payload) => dispatch(deleteTask(payload)),
        addTask: (payload) => dispatch(addTask(payload)),
        getFavorite: (payload) => dispatch(getFavorite(payload)),
        deleteFavorite: (payload) => dispatch(deleteFavorite(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)