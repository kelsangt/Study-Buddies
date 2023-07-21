import './TeamList.css'

const TeamList = () => {
  return (
    <div id='team-div'>
      <div id='meet-team'>Meet our Team</div>

      <div className='team-holder'>
        <div className='individual-team-component'>
            <div id="team-lead" className='teamPosition'>Team Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/kelsang2.jpg')}
                alt=''
              />
            </div>
            <div id='team-member-name'>Kelsang Tsering</div>
            <div id="kelsang-links">
              <a href="https://github.com/kelsangt" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/kelsang-tsering/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
              <a href="https://kelsangtsering.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe" id="portfolioLink"></i>
              </a>
            </div>

        </div>
      
        <div className='individual-team-component'>
            <div id="frontend-lead" className='teamPosition'>Frontend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/ying.jpeg')}
                alt=''
              />
            </div>
            <div id='team-member-name'>Yinglin Zhou</div>
            <div id="ying-links">
              <a href="https://github.com/yinglzhou" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github" id="githubLink" ></i>
              </a>
              <a href="https://www.linkedin.com/in/yinglzhou/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
              <a href="https://yinglinzhou.netlify.app/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe" id="portfolioLink"></i>
              </a>
            </div>

        </div>
      
        <div className='individual-team-component'>
            <div id="backend-lead" className='teamPosition'>Backend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/fahim.jpeg')}
                alt=''
              />
            </div>
            <div id='team-member-name'>Fahim Khan</div>
            <div id="fahim-links">
              <a href="https://github.com/fk652" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/fk652/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
              <a href="https://fahim-khan.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe" id="portfolioLink"></i>
              </a>
            </div>
        </div>
      
        <div className='individual-team-component'>
            <div id="flex-lead" className='teamPosition'>Flex Engineer</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/diner.jpeg')}
                alt=''
              />
            </div>
            <div id='team-member-name'>Justin Diner</div>
            <div id="justin-links">
              <a href="https://github.com/Justin-Diner" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/justin-diner/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
              <a href="https://www.justindiner.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe" id="portfolioLink"></i>
              </a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TeamList;