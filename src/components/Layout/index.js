import DeskTopLayout from './DeskTopLayout';
import MobileLayout from './MobileLayout';

export default class Layout {
	render() {
		return `${DeskTopLayout()} ${MobileLayout()}`;
	}
}
