import DeskTopLayout from './DeskTopLayout';
import MobileLayout from './MobileLayout';

export default function Layout() {
	return `${DeskTopLayout()} ${MobileLayout()}`;
}
