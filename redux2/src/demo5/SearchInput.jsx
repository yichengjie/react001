class SelectInput extends Component {
  static displayName = 'SelectInput';
  render() {
    const { selectedItem, isActive, onClickHeader, placeholder } = this.props;
    const { text } = selectedItem || {};
    return (
      <div onClick={onClickHeader}>
        <Input 
          type="text"
          disabled
          value={text}
          placeholder={placeholder}
        />
        <Icon className={isActive} name="angle-down" />
      </div>
    );
  }
}


// 完成SearchInput与List的交互
const SearchDecorator = Wrapper => {
  class WrapperComponent extends Component {
        handleSearch(keyword) {
            this.setState({
                data: this.props.data,
                keyword,
            });
            this.props.onSearch(keyword);
        }
        render() {
            const { data, keyword } = this.state;
            return (
                <Wrapper
                {...this.props}
                data={data}
                keyword={keyword}
                onSearch={this.handleSearch.bind(this)}
                />
            );
        }
  }
  
  return WrapperComponent;
};

// 完成List数据请求
const AsyncSelectDecorator = Wrapper => {
  class WrapperComponent extends Component {
    componentDidMount() {
      const { url } = this.props;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;
      return (
        <Wrapper
          {...this.props}
          data={data}
        />
      );
    }
  }

  return WrapperComponent;
}


//@SearchDecorator
class Search extends Component {
  render() {
    return (
      <Selector
        {...this.props}
      >
        <SearchInput />
        <List />
      </Selector>
    );
  }
}
