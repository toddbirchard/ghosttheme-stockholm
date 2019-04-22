/*
Home : https://github.com/c0ncept/github-user-card
*/

const GITHUB_USER = 'toddbirchard'
const GITHUB_URL = 'https://api.github.com/users/'



Chart.defaults.global = {
  animation: true,
  animationSteps: 50,
  animationEasing: "easeOutBounce",
  scaleLabel: "<%=value%>",
  bezierCurve: true,
  bezierCurveTension: 1,
  scaleIntegersOnly: true,
  scaleBeginAtZero: false,
  maintainAspectRatio: false,
  onAnimationProgress: function() {},
  onAnimationComplete: function() {}
}

class Repo extends React.Component {
  render() {
    let {repo} = this.props
    return (
        <a className="repository" href={repo.html_url}>
          <div className="repo-info">
            <div><i className="fa fa-star"></i>
              <span></span><span className="title">{repo.name}</span>
            </div>

          </div>
        </a>
    )
  }
}

class DataChart extends React.Component {

  eventsRange(event) {
    let range = []
    for (let i = 11; i > 0; i--) {
      range.push(moment().subtract(i, 'days').format('YYYY-MM-DD'))
    }
    let evtmp = this.props.events
      .filter(e => event(e.type))
      .map(e => e.created_at.match(/^(\d{4}-\d{2}-\d{2}).*/)[1])

    return range.map(r => evtmp.reduce(function(p,c) { return r === c ? p + 1 : p}, 0))

  }

  componentDidMount() {
    let pushEvents = this.eventsRange((e) => e === 'PushEvent')
    let miscEvents = this.eventsRange((e) => e !== 'PushEvent')

    var lineChartData = {
      labels: pushEvents,
      datasets: [{
        fillColor: "#7E9BA0",
        strokeColor: "rgba(0,0,0,0)",
        pointColor: "rgba(255, 255, 255, 0)",
        pointStrokeColor: "rgba(255, 255, 255, 0)",
        data: pushEvents
      }, {
        fillColor: "#f06292",
        strokeColor: "rgba(0,0,0,0)",
        pointColor: "rgba(255, 255, 255, 0)",
        pointStrokeColor: "rgba(255, 255, 255, 0)",
        data: miscEvents
      }]
    };

    var ctx1 = document.getElementById("chart").getContext("2d");
    this.chart = new Chart(ctx1).Line(lineChartData);

  }

  render() {
    return (
      <div className="chart">
        <canvas id="chart" width="370" height="100" />
      </div>
    )
  }
}

class RepoChart extends React.Component {
  componentDidMount() {
    var htmlData = [
      {
        value: this.props.repos[0].stargazers_count,
        color: "#f8bbd0"
      },
      {
        value : this.props.repos[1].stargazers_count,
        color : "#ec407a"
      },
      {
        value : this.props.repos[2].stargazers_count,
        color : "#fff"
      }
    ];
    var ctx2 = document.getElementById("pie").getContext("2d");
    new Chart(ctx2).Doughnut(htmlData, {
      segmentShowStroke: false,
      percentageInnerCutout : 80
    })
  }
  render() {
    let totals = this.props.repos.reduce(function(p,c) {
      return p + c.stargazers_count
    },0)
    return (
      <div className="pie-chart-wrap">
        <div className="pie-chart-totals">
          <i className="fa fa-star"></i>{totals}
        </div>
        <canvas id="pie" className="pie-chart" width="180" height="180">
        </canvas>
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    let reposData = this.props.repos
      .sort((a,b) => b.stargazers_count - a.stargazers_count)
      .slice(0,3)
    let repos = reposData
      .map((r,i) => <Repo key={i} repo={r} />)

    let starred = this.props.repos
      .reduce(function(p,c) {return p + Number(c.stargazers_count) }, 0)

    let forked = this.props.repos
      .reduce(function(p,c) {return p + Number(c.forks_count) }, 0)

    return (
        <div className="card">
          <div className="header">

            <a className="userlink" href={this.props.user.html_url}>
              {this.props.user.login}
              <i className="fa fa-link"></i>
            </a>

            <div className="avatar">
              <img src={this.props.user.avatar_url} />
            </div>

            <span className="repos-count">
              {this.props.user.public_repos}
            </span>

            <div className="userinfo">
              <h2>{this.props.user.name || this.props.user.login}</h2>
              <p>{this.props.user.location}</p>
            </div>
          </div>
          <div className="totals">
            <div>
              {this.props.user.followers}
              <div className="desc">Followers</div>
            </div>
            <div>
              {starred}
              <div className="desc">Total stars</div>
            </div>
            <div>
              {forked}
              <div className="desc">Times Forked</div>
            </div>
          </div>

          <DataChart events={this.props.events} />

          <br /><br />
          <div className="super-line">TOP Rated</div>
            <RepoChart repos={reposData} />
          <div className="top-repos">
            {repos}
          </div>
  <br /><br />
        </div>
    )
  }
}


class Application extends React.Component {
  constructor() {
    super()
    this.state = {user : {}, repos : []}
    this.loadGitHubUser(GITHUB_USER)
  }

  loadGitHubUser(user) {
    Promise.all([
      fetch(GITHUB_URL + user).then(r => r.json()),
      fetch(GITHUB_URL + user + '/repos').then(r => r.json()),
      fetch(GITHUB_URL + user + '/events?per_page=300').then(r => r.json())
    ]).then((resp) => {
      this.setState({user: resp[0], repos : resp[1], events : resp[2]})
    })
  }

  render() {
    let children = this.state.user.hasOwnProperty('login')
      ? <Card user={this.state.user} repos={this.state.repos} events={this.state.events} />
      : <div className="loading"><span></span><span></span><span></span><span></span><span></span></div>

    return (
      <div className="wrapper">
        {children}
      </div>
    )
  }
}

ReactDOM.render(<Application />,
   document.getElementById('application'))
