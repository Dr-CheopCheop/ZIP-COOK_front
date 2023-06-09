import React, { useState, useEffect } from 'react';
import * as C from './ChatbotStyle';
import axios from 'axios';
import Clock from 'react-live-clock';
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from '../../reducer/userSlice';
import { useNavigate } from 'react-router-dom'; 

const ChatbotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState({
      icon: '',
    });
    const [monthFoods, setMonthFoods] = useState([]);
    const [chatbotResponse, setChatbotResponse] = useState("");
    const [userRequest, setUserRequest] = useState("");
    const [tempRequest, setTempRequest] = useState("");
    let monthArray: string[] = ['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let now = new Date();
    let tempMonth = now.getMonth();
    // setMonth(monthArray[tempMonth]);
    let month = monthArray[tempMonth];
    // const examples = ['오렌지', '사과', '딸기', '포도', '수박'];

    const cityName = 'Seoul';
    const apiKey = `3cd159f4738663f7bef01ba94f76bc30`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    useEffect(() => {
      const fetchWeatherData = async () => {
        setLoading(true);
        const response = await axios.get(url);
        setWeatherData({
          icon: response.data.weather[0].icon
        });
        setLoading(false);
      };
      fetchWeatherData();
    }, []);

  const weatherImgSrc = `https://openweathermap.org/img/w/${weatherData.icon}.png`;


  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      const response = await axios.get(`/chatbot/${month}`);
      setMonthFoods(response.data);
      setLoading(false);
    };
    fetchFoodData();
  }, []);
  console.log(monthFoods);
    
  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = e;
    setUserRequest(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      const getChatBotResponse = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`/chatbot/message`, {
            question: userRequest,
          });
          console.log(response.data);
          setChatbotResponse(response.data.choices[0].text);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      getChatBotResponse();
      setTempRequest(userRequest);
    console.log(userRequest);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
     dispatch(SET_TOKEN(accessToken));
    }else {
     navigate('/login');
    }
   },[]);

    return (
        <C.Container>
            <C.FirstDiv>
                <C.WeatherBox>
                    <C.WeatherIcon src={weatherImgSrc} />
                    <C.DateBox>
                        <span>
                            <Clock format={'YYYY-MM-DD'} ticking={false} timezone={"Asia/Seoul"} />
                        </span>
                    </C.DateBox>
                </C.WeatherBox>
                <C.FoodBox>
                    <C.FoodText1>제철 음식</C.FoodText1>
                    <C.MonthFoodBox>{monthFoods.map(monthFood => (
                      <C.MonthFoodList>{monthFood}</C.MonthFoodList>
                    ))}</C.MonthFoodBox>
                </C.FoodBox>
            </C.FirstDiv>
            <C.ChatbotDiv>
              <C.UserRequestWrapper>
                <C.UserRequestText>
                  {tempRequest}
                </C.UserRequestText>
              </C.UserRequestWrapper>
              <C.ChatbotResponseWrapper>
                <C.ChatbotResponseText>
                {chatbotResponse.split('<br>').map((line) => {
                  return (
                    <>
                      {line}
                    </>
                  );
                })}
                </C.ChatbotResponseText>
              </C.ChatbotResponseWrapper>
                <C.ChatbotForm onSubmit={onSubmit}>
                    <C.UserInput
                      value={userRequest}
                      onChange={onChange}
                      type="text"
                    />
                    <C.SubmitButton type="submit">&uarr;</C.SubmitButton>
                </C.ChatbotForm>
            </C.ChatbotDiv>
        </C.Container>
    )
}


export default ChatbotPage;